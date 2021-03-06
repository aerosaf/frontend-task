import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import NoteList from './components/sidebar/NoteList';
import NotePad from './components/editor/NotePad';


class App extends Component {
  constructor(props) {
    super(props);
    this.selectNote = this.selectNote.bind(this);
    this.editText = this.editText.bind(this);
    this.addNew = this.addNew.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.find = this.find.bind(this);
  }

  state = {
    notes: [],
    textArea: {
      id: null,
      body: '',
    },
    search: {
      target: '',
    },
  }

  // Initial structure
  // notes: [
  //   {
  //     id: 1,
  //     body: 'My first note\nThis is my first note',
  //   },
  //   {
  //     id: 2,
  //     body: 'How to make omelette\nYou need an egg, salt, and butter',
  //   },
  //   {
  //     id: 3,
  //     body: 'Car manual\nPress button to start engine, press paddle to accelerate',
  //   },
  // ],
  // textArea:{},

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.getLocalStorage();
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      console.log('ERR:NO_LOCAL_STORAGE_STATE');
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        notes: [
          {
            id: 1,
            body: 'My first note\nThis is my first note',
          },
          {
            id: 2,
            body: 'How to make omelette\nYou need an egg, salt, and butter',
          },
          {
            id: 3,
            body: 'Car manual\nPress button to start engine, press paddle to accelerate',
          },
        ],
        textArea: {},
        search: {
          target: '',
        },
      });
      setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
    }
  }

  getLocalStorage() {
    // parse the localStorage string and setState
    try {
      this.setState(JSON.parse(localStorage.getItem('state')));
    } catch (e) {
      // handle empty string
      console.log(e);
      this.setState({ notes: [JSON.parse(localStorage.getItem('state'))] });
    }
  }

  // Update body content from TextArea
  editText(event, id) {
    this.setState({
      notes: this.state.notes.map((note) => {
        const tempNote = note;
        if (note.id === id) {
          tempNote.body = event.target.value;
          this.state.textArea.body = event.target.value;
        }
        return tempNote;
      }),
    });
    setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
  }

  // Select sidebar titles to show in textarea
  selectNote(id) {
    let tempTextArea;
    this.state.notes.forEach((note) => {
      if (note.id === id) {
        tempTextArea = {
          id: note.id,
          body: note.body,
        };
      }
    });
    this.setState({
      textArea: tempTextArea,
    });
    setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
  }

  addNew() {
    const tempNotes = this.state.notes;
    const tempTextArea = this.state.textArea;
    // eslint-disable-next-line no-bitwise
    let objectId = (new Date().getTime() / 1000 | 0).toString(16);
    // eslint-disable-next-line no-bitwise
    objectId += 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    tempNotes.push({
      id: objectId,
      body: 'New note',
    });
    tempTextArea.id = objectId;
    tempTextArea.body = 'New note';
    this.setState({
      notes: tempNotes,
      textArea: tempTextArea,
    });
    setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
  }

  deleteNote(id) {
    let tempNotes = this.state.notes;
    tempNotes = tempNotes.filter(note => note.id !== id);
    this.setState({
      notes: tempNotes,
      textArea: {},
    });
    setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
  }

  find(event) {
    this.setState({
      search: {
        target: event.target.value,
        found: this.filter(),
      },
    });
    setTimeout(() => localStorage.setItem('state', JSON.stringify(this.state)), 1000);
  }

  filter() {
    let notesFound = [];
    notesFound = this.state.notes
      .filter(note => (note.body.toLowerCase().includes(this.state.search.target.toLowerCase()) ||
        note.body.toLowerCase().indexOf(this.state.search.target.toLowerCase()) !== -1));
    return notesFound;
  }

  render() {
    return (
      <Container>
        <div className="ui grid">
          <div className="sixteen wide column">
            <h1>Note App</h1>
          </div>
          <div className="four wide column">
            <div className="ui search">
              <div className="ui icon input">
                <input className="prompt" type="search" value={this.state.search.target} onChange={this.find} />
                <i className="search icon" />
              </div>
            </div>
            <div className="ui vertical menu">
              <NoteList
                className="ui grid"
                notes={this.state.search.target ? this.state.search.found : this.state.notes}
                selectNote={this.selectNote}
                deleteNote={this.deleteNote}
              />
            </div>
            <button
              onClick={this.addNew}
              className="ui primary basic button"
              onKeyPress={() => this.addNew}
            >
              Add Note
            </button>
          </div>
          <div className="eight wide column">
            <NotePad textArea={this.state.textArea} editText={this.editText} />
          </div>
        </div>
      </Container >
    );
  }
}

export default App;
