import create from "./fiches/create.js";
import read from "./fiches/read.js";
import readNotification from "./notifications/read.js";
import createNotification from "./notifications/create.js";
read(() => {
  readNotification();
});

create(
  () => read(readNotification),
  () => createNotification("Un paiement a été effectué avec succès.")
);
