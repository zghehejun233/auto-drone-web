import { Container, Plane } from "lucide-react";

const deviceStatusStyle = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-green-500";
    case "Offline":
      return "bg-red-500";
    case "Unknown":
      return "bg-yellow-500";
    default:
      return "bg-yellow-500";
  }
};

const historyItemStatusStyle = (status: string) => {
  switch (status) {
    case "Running":
      return "text-green-500";
    case "Success":
      return "text-green-500";
    case "Failed":
      return "text-red-500";
    case "Stopped":
      return "text-red-500";
    case "Paused":
      return "text-yellow-500";
    case "Waiting":
      return "text-yellow-500";
    case "Unknown":
      return "text-yellow-500";
    default:
      return "text-yellow-500";
  }
};

const deviceTypeIcon = (status: string) => {
  const style = "size-4";
  switch (status) {
    case "drone":
      return <Plane className={style} />;
    case "dock":
      return <Container className={style} />;
    default:
      return <></>;
  }
};

export { deviceStatusStyle, deviceTypeIcon, historyItemStatusStyle };

