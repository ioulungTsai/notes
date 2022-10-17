import { Component, h, Prop } from '@stencil/core';

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

  render() {
    return (
      <div class="fsk-note">
        <div class="fsk-note-content">
          Now displaying note: {this.noteId}
        </div>
      </div>
    );
  }

}
