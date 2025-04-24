import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Main() {
  return (
    <div className="">
      <main>
        <Button type="primary" size="size" icon={<DownloadOutlined />}>
          Primary button
        </Button>
      </main>
    </div>
  );
}

export default Main;
