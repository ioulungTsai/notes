import { Component, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil-community/router/dist/types/stencil.core';

/**
 * Displays a note
 */
@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote {
  /**
   * HTML property note-id: id of the note to display
   */
  @Prop() noteId: string

  @Event() closeNote: EventEmitter
  onClose() {
    this.closeNote.emit()
  }

  render() {
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <strong>Note Title</strong>
          <nav class="fsk-note-button" onClick={() => this.onClose()}>close</nav>
        </header>
        <div class="fsk-note-content">
          Now displaying note: {this.noteId}
        </div>
      </div>
    );
  }

}
