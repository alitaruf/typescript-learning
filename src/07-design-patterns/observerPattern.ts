// ─────────────────────────────────────────────
// 1. The Observer pattern - a Subject keeps a list
//    of Observers and notifies all of them whenever
//    its state changes, without knowing anything
//    about what each observer actually does
// ─────────────────────────────────────────────
interface Observer {
  update(message: string): void;
}

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(message: string): void;
}

// ─────────────────────────────────────────────
// 2. A concrete Subject - holds the observer list
//    and loops over it whenever something happens
// ─────────────────────────────────────────────
class NewsPublisher implements Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }

  publish(headline: string): void {
    this.notify(`Breaking news: ${headline}`);
  }
}

// ─────────────────────────────────────────────
// 3. Concrete Observers - each reacts to the same
//    notification in its own way
// ─────────────────────────────────────────────
class EmailSubscriber implements Observer {
  constructor(private email: string) {}

  update(message: string): void {
    console.log(`[Email to ${this.email}] ${message}`);
  }
}

class SmsSubscriber implements Observer {
  constructor(private phone: string) {}

  update(message: string): void {
    console.log(`[SMS to ${this.phone}] ${message}`);
  }
}

// ─────────────────────────────────────────────
// 4. Subscribing, notifying, and unsubscribing -
//    the publisher never has to change to support
//    a new kind of observer
// ─────────────────────────────────────────────
const publisher = new NewsPublisher();
const emailSub = new EmailSubscriber("ali@example.com");
const smsSub = new SmsSubscriber("555-1234");

publisher.subscribe(emailSub);
publisher.subscribe(smsSub);
publisher.publish("TypeScript 7 released");

publisher.unsubscribe(smsSub);
publisher.publish("Second story - the unsubscribed SMS observer won't see this");
