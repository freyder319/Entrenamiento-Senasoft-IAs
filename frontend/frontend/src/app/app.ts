import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,   // 👈 Importantísimo
  imports: [FormsModule, HttpClientModule,CommonModule], 
  template: `
    <div style="padding:20px">
      <h2>Chat con IA 🤖</h2>

      <div *ngFor="let msg of mensajes">
        <strong *ngIf="msg.role === 'user'">Tú:</strong>
        <strong *ngIf="msg.role === 'assistant'">IA:</strong>
        {{ msg.content }}
      </div>

      <input [(ngModel)]="mensaje" placeholder="Escribe tu mensaje" />
      <button (click)="enviar()">Enviar</button>
    </div>
  `,
})
export class AppComponent {
  mensaje = ''; // lo que escribes ahora
  mensajes: { role: 'user' | 'assistant'; content: string }[] = []; // historial
  constructor(private http: HttpClient) {}

  enviar() {
    // Agregar el mensaje del usuario al historial
    this.mensajes.push({ role: 'user', content: this.mensaje });

    // Llamar al backend con todo el historial
    this.http
      .post<{ texto: string }>('http://localhost:3000/mcp', { messages: this.mensajes })
      .subscribe((res) => {
        // Agregar la respuesta de la IA al historial
        this.mensajes.push({ role: 'assistant', content: res.texto });
        this.mensaje = ''; // limpiar input
      });
  }
}
