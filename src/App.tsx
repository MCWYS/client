import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function App() {
  return (
    <>
      <NextUIProvider>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Hello world!</h1>
        <Button color="primary">NextUI 버튼</Button>
        <div className="flex flex-wrap gap-4 items-center">
          <Button color="primary" variant="solid">
            Solid
          </Button>
          <Button color="primary" variant="faded">
            Faded
          </Button>
          <Button color="primary" variant="bordered">
            Bordered
          </Button>
          <Button color="primary" variant="light">
            Light
          </Button>
          <Button color="primary" variant="flat">
            Flat
          </Button>
          <Button color="primary" variant="ghost">
            Ghost
          </Button>
          <Button color="primary" variant="shadow">
            Shadow
          </Button>
        </div>
      </NextUIProvider>
    </>
  );
}

export default App;
