import create from "./categories/salaires/create.js";
import read from "./categories/salaires/read.js";
import readNotification from "./notifications/read.js";
import createNotification from "./notifications/create.js";
read(() => {
  readNotification();
});

create(() => read(readNotification), createNotification);
