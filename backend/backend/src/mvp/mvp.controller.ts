import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './mvp.service';

@Controller('mcp')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post()
  async generar(
    @Body('messages') messages: { role: 'user' | 'assistant'; content: string }[]
  ) {
    const texto = await this.llmService.generarConversacion(messages);
    return { texto };
  }
}
