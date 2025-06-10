import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { ListSchedule } from "../components/schedule/ListSchedule";
import NewSchedule from "../components/schedule/NewSchedule";

export const Timetable = observer(() => {
  const [newSchedule, setNewSchedule] = useState(false);
  return (
    <div className="h100">
      {newSchedule ? <NewSchedule setNewSchedule={setNewSchedule} /> : <></>}
      <ListSchedule setNewSchedule={setNewSchedule} />
    </div>
  );
});
