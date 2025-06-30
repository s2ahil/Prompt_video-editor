import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export class VideoProcessor {
  private ffmpeg: FFmpeg;
  private isLoaded = false;

  constructor() {
    this.ffmpeg = new FFmpeg();
  }

  async initialize(): Promise<void> {
    if (this.isLoaded) return;

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
    
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    this.isLoaded = true;
  }

  async processVideo(
    inputFile: File,
    prompt: string,
    onProgress?: (message: string) => void
  ): Promise<Blob> {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not initialized');
    }

    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp4';

    // Write input file to FFmpeg filesystem
    onProgress?.('Loading video file...');
    await this.ffmpeg.writeFile(inputFileName, await fetchFile(inputFile));

    // Parse prompt and generate FFmpeg command
    const command = this.parsePromptToCommand(prompt, inputFileName, outputFileName);
    
    onProgress?.('Processing video...');
    
    // Execute FFmpeg command
    await this.ffmpeg.exec(command);

    // Read the output file
    onProgress?.('Finalizing...');
    const data = await this.ffmpeg.readFile(outputFileName);

    // Clean up
    await this.ffmpeg.deleteFile(inputFileName);
    await this.ffmpeg.deleteFile(outputFileName);

    return new Blob([data], { type: 'video/mp4' });
  }

  private parsePromptToCommand(prompt: string, input: string, output: string): string[] {
    const lowerPrompt = prompt.toLowerCase();

    // Trim video - Fixed implementation to prevent freezing
    if (lowerPrompt.includes('trim')) {
      const timeMatch = lowerPrompt.match(/(\d+):(\d+)\s*to\s*(\d+):(\d+)/);
      if (timeMatch) {
        const startTime = `${timeMatch[1]}:${timeMatch[2]}`;
        const endTime = `${timeMatch[3]}:${timeMatch[4]}`;
        
        // Use -avoid_negative_ts make_zero to prevent timing issues
        // Use -copyts to preserve timestamps
        // Re-encode to avoid keyframe issues that cause freezing
        return [
          '-i', input,
          '-ss', startTime,
          '-to', endTime,
          '-avoid_negative_ts', 'make_zero',
          '-c:v', 'libx264',
          '-c:a', 'aac',
          '-preset', 'fast',
          output
        ];
      }
    }

    // Speed up video
    if (lowerPrompt.includes('speed up') || lowerPrompt.includes('faster')) {
      const speedMatch = lowerPrompt.match(/(\d+(?:\.\d+)?)x/);
      const speed = speedMatch ? parseFloat(speedMatch[1]) : 2;
      const videoSpeed = 1 / speed;
      const audioSpeed = speed;
      return [
        '-i', input,
        '-filter_complex', `[0:v]setpts=${videoSpeed}*PTS[v];[0:a]atempo=${audioSpeed}[a]`,
        '-map', '[v]', '-map', '[a]',
        output
      ];
    }

    // Slow down video
    if (lowerPrompt.includes('slow down') || lowerPrompt.includes('slower')) {
      const speedMatch = lowerPrompt.match(/(\d+(?:\.\d+)?)x/);
      const speed = speedMatch ? parseFloat(speedMatch[1]) : 0.5;
      const videoSpeed = 1 / speed;
      const audioSpeed = speed;
      return [
        '-i', input,
        '-filter_complex', `[0:v]setpts=${videoSpeed}*PTS[v];[0:a]atempo=${audioSpeed}[a]`,
        '-map', '[v]', '-map', '[a]',
        output
      ];
    }

    // Mute audio
    if (lowerPrompt.includes('mute') || lowerPrompt.includes('remove audio')) {
      return ['-i', input, '-an', '-c:v', 'copy', output];
    }

    // Default: just copy the file
    return ['-i', input, '-c', 'copy', output];
  }

  private timeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }
}