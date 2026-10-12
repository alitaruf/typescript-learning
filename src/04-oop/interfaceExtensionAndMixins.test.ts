import { test } from "node:test";
import assert from "node:assert/strict";
import {
  StaffMember,
  Timestamped,
  Serializable,
  Document,
  Image,
} from "./interfaceExtensionAndMixins";

test("StaffMember satisfies the combined Employee interface", () => {
  const staff = new StaffMember("Ali", 28, 101);

  assert.equal(staff.name, "Ali");
  assert.equal(staff.age, 28);
  assert.equal(staff.employeeId, 101);
});

test("Timestamped mixin adds a createdAt field and a working getAge()", () => {
  const TimestampedDocument = Timestamped(Document);
  const doc = new TimestampedDocument("Report.pdf");

  assert.ok(doc.createdAt instanceof Date);
  assert.equal(typeof doc.getAge(), "number");
  assert.ok(doc.getAge() >= 0);
});

test("Serializable mixin adds a serialize() that JSON-encodes the instance", () => {
  const SerializableDocument = Serializable(Document);
  const doc = new SerializableDocument("Report.pdf");

  assert.equal(doc.serialize(), JSON.stringify(doc));
  assert.deepEqual(JSON.parse(doc.serialize()), { title: "Report.pdf" });
});

test("mixins can be stacked on top of each other", () => {
  const TimestampedSerializableDocument = Serializable(Timestamped(Document));
  const doc = new TimestampedSerializableDocument("Report.pdf");

  assert.equal(doc.title, "Report.pdf");
  assert.ok(doc.createdAt instanceof Date);
  assert.equal(typeof doc.getAge(), "number");
  assert.equal(typeof doc.serialize(), "string");
});

test("mixins are reusable across unrelated base classes", () => {
  const TimestampedImage = Timestamped(Image);
  const image = new TimestampedImage("photo.png");

  assert.equal(image.url, "photo.png");
  assert.ok(image.createdAt instanceof Date);
});
