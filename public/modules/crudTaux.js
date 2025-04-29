import create from "./categories/taux/create.js";
import read from "./categories/taux/read.js";
import readNotification from "./notifications/read.js";
import createNotification from "./notifications/create.js";
read(() => {
  readNotification();
});

create(() => read(readNotification), createNotification);
