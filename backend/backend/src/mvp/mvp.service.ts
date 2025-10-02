import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LlmService {
  private client: OpenAI;
  private knowledge: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    // ✅ Ruta absoluta al knowledge.md
    const filePath = path.resolve(process.cwd(), 'src/knowledge/knowledge.md');

    if (fs.existsSync(filePath)) {
      this.knowledge = fs.readFileSync(filePath, 'utf8');
      console.log('✅ Knowledge cargado correctamente');
    } else {
      this.knowledge = 'No hay información cargada.';
      console.warn('⚠️ No se encontró knowledge.md en', filePath);
    }
  }

  async generarConversacion(mensajes: { role: 'user' | 'assistant'; content: string }[]) {
    const conversation = [
      {
        role: 'system' as const,
        content: `Eres un asistente con acceso a esta base de conocimiento. 
        Usa SOLO esta información cuando el usuario pregunte por personas o datos.\n\n${this.knowledge}`,
      },
      ...mensajes,
    ];

    const res = await this.client.chat.completions.create({
      model: 'meta-llama/llama-3-8b-instruct',
      messages: conversation,
    });

    return res.choices[0].message.content || 'Sin respuesta';
  }
}
