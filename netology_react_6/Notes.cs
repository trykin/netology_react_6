using netology_react_6.Controllers;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace netology_react_6
{
    public class Notes:INotes
    {
        private List<NoteData> _notes {get; set;}

        public Notes()
        {
            _notes = new List<NoteData>();
        }

        public NoteData AddNote(NotePost post)
        {
            NoteData data = new NoteData{ Id = Guid.NewGuid(), Content = post.Content };
            _notes.Add(data);
            return data;
        }

        public List<NoteData> GetAllNotes()
        {
            return _notes;
        }

        public NoteData PutNote(NoteData put)
        {
            NoteData data = _notes.Where(p=> p.Id == put.Id).FirstOrDefault();
            data.Content = put.Content;
            return data;
        }

        public void DeleteNote(NoteDelete del)
        {
            _notes.RemoveAll(p => p.Id == del.Id);
        }

        public NoteData GetNote(Guid get)
        {
            NoteData data = _notes.Where(p => p.Id == get).FirstOrDefault();
            return data;
        }
    }

    public interface INotes
    {
        NoteData AddNote(NotePost post);
        List<NoteData> GetAllNotes();
        NoteData GetNote(Guid get);
        NoteData PutNote(NoteData put);
        void DeleteNote(NoteDelete del);
    }
}
