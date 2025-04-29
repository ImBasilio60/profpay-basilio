import create from "./professeurs/create.js";
import read from "./professeurs/read.js";

import readNotification from "./notifications/read.js";
import createNotification from "./notifications/create.js";
read(() => {
  readNotification();
});

create(() => read(readNotification), createNotification);
