import { Component, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil-community/router/dist/types/stencil.core';
import { getNote } from '../../library/NotesData'

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
  @Prop() noteId: number

  /**
   * Sent when user clicks on close button
   * @event
   */
  @Event() closeNote: EventEmitter

  /**
   * Called from HTML when user clicks on the close button
   */
  onClose() {
    this.closeNote.emit()
  }

  /**
   * Called from HTML when user clicks on the save button
   */
  onSave() {
    console.log('save button')
  }

  render() {
    const note = getNote(this.noteId)
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <input id="fsk-note-title" value={note.title}/>
          <nav
            id="fsk-note-save"
            class="fsk-note-button"
            onClick={() => this.onSave()}>
            Save
          </nav>
          <nav
            id="fsk-note-close"
            class="fsk-note-button"
            onClick={() => this.onClose()}>
            Close
          </nav>
        </header>
        <textarea class="fsk-note-content">
          {note.text}
        </textarea>
      </div>
    );
  }

}
