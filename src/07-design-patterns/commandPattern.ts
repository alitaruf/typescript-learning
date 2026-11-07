// ─────────────────────────────────────────────
// 1. The Command pattern - wrap a request (and
//    everything needed to undo it) as an object,
//    so callers can queue, log, or undo actions
//    without knowing how each one is implemented
// ─────────────────────────────────────────────
interface Command {
  execute(): void;
  undo(): void;
}

// ─────────────────────────────────────────────
// 2. The receiver - the object commands actually
//    operate on. It knows nothing about undo history
//    or command objects at all
// ─────────────────────────────────────────────
class TextDocument {
  content = "";
}

// ─────────────────────────────────────────────
// 3. Concrete commands - each one captures what it
//    needs to both do and undo a single action
// ─────────────────────────────────────────────
class InsertTextCommand implements Command {
  constructor(
    private document: TextDocument,
    private text: string,
  ) {}

  execute(): void {
    this.document.content += this.text;
  }

  undo(): void {
    this.document.content = this.document.content.slice(0, -this.text.length);
  }
}

class UppercaseCommand implements Command {
  private previousContent = "";

  constructor(private document: TextDocument) {}

  execute(): void {
    this.previousContent = this.document.content;
    this.document.content = this.document.content.toUpperCase();
  }

  undo(): void {
    this.document.content = this.previousContent;
  }
}

// ─────────────────────────────────────────────
// 4. The invoker - keeps a history of executed
//    commands and can undo them in reverse order,
//    without knowing what any of them actually do
// ─────────────────────────────────────────────
class CommandHistory {
  private history: Command[] = [];

  run(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undoLast(): void {
    const command = this.history.pop();
    command?.undo();
  }
}

// ─────────────────────────────────────────────
// 5. Running commands and undoing them
// ─────────────────────────────────────────────
const document = new TextDocument();
const history = new CommandHistory();

history.run(new InsertTextCommand(document, "Hello, "));
history.run(new InsertTextCommand(document, "world!"));
console.log(document.content);

history.run(new UppercaseCommand(document));
console.log(document.content);

history.undoLast();
console.log(document.content);

history.undoLast();
console.log(document.content);
