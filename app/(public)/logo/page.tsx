import Image from "next/image";

const LogoPage = () => (
  <main className="flex min-h-screen flex-col items-center justify-center p-8">
    <div className="m-4">
      <Image src="/logo.svg" alt="Logo" width={500} height={500} />
    </div>
  </main>
);

export default LogoPage;
