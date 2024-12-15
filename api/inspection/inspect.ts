import { DeviceItem, TaskHistoryItem } from "./inspect.d";

const taskStatusMap: Record<string, string> = {
  "0": "Running",
  "1": "Success",
  "2": "Failed",
  "3": "Stopped",
  "4": "Paused",
  "5": "Waiting",
  "6": "Unknown",
};

const deviceStatusMap: Record<string, string> = {
  "0": "Online",
  "1": "Offline",
  "2": "Unknown",
};

const getTaskHistory = async (taskId: number): Promise<TaskHistoryItem[]> => {
  console.log("getTaskHistory", taskId);

  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 500)
  );

  const data = Array.from({
    length: 10,
  }).map((_, i) => ({
    id: i,
    name: `Task ${i}`,
    status: taskStatusMap[i % 6],
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
  }));
  console.log(data);
  return data;
};

const getDeviceList = async (taskId: number): Promise<DeviceItem[]> => {
  console.log("getDeviceList", taskId);

  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 500)
  );

  const data = [
    {
      id: 1,
      name: "Device 1",
      description: "This is a description",
      status: deviceStatusMap[Math.floor(Math.random() * 3).toString()],
      modelType: "drone",
    },
    {
      id: 2,
      name: "Device 2",
      description: "This is a description",
      status: deviceStatusMap[Math.floor(Math.random() * 3).toString()],
      modelType: "dock",
    },
  ];

  console.log(data);
  return data;
};

export { taskStatusMap, deviceStatusMap, getTaskHistory, getDeviceList };
