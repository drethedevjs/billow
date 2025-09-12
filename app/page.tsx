import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row p-10">
        <div className="w-full md:w-1/2">
          <div className="mx-auto max-w-md">
            <p className="!text-4xl mb-5 text-primary dark:text-accent font-semibold text-center">
              Log In
            </p>
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@billow.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-accent transition-colors"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-primary dark:text-error">
            Welcome to Billow!
          </h1>
          <p>
            Take the hassle out of paying utility bills. Billow connects
            directly to your service providers, tracks what you owe, and lets
            you pay securely — all in one place. Bank-connected, worry-free, and
            always on time.
          </p>
        </div>
      </div>
    </>
  );
}
