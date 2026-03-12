# Lab Task: Implement Tag Feature for Notes

## Objective
Add tag functionality to create and edit note screens. Users can add/edit a tag field when creating or editing notes.

## Tasks

### 1. Update `noteService.ts`
- Modify `createNote()` to accept `tag` parameter and include it in the new note object
- Modify `updateNote()` to accept `tag` parameter and include it in the updated note object

### 2. Update `CreateNoteScreen.tsx`
- Add `tag` state: `const [tag, setTag] = useState('');`
- Add tag field to `hasUnsavedChanges()` check
- Add tag TextInput field (between Content and buttons)
- Pass `tag` to `noteService.createNote(title, content, tag)`

### 3. Update `EditNoteScreen.tsx`
- Add `tag` state: `const [tag, setTag] = useState('');`
- Add `originalTag` state for change detection
- Load tag value in `loadNote()`: `setTag(note.tag || '');`
- Add tag to `hasUnsavedChanges()` check
- Add tag TextInput field (between Content and buttons)
- Pass `tag` to `noteService.updateNote(noteId, title, content, tag)`

## Tag Field UI
- Label: "Tag"
- Placeholder: "Enter tag (optional)"
- Style: Same as Title field (single line input)
- Position: After Content field, before buttons

## Notes
- Tag field is optional (no validation required)
- Use empty string `''` as default if tag is undefined
- Tag field should be included in unsaved changes detection
