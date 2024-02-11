# chARM - Visual emulator for ARM
> Developed by Ben Tomsett for his final year project at the University of East Anglia

---

chARM is a web-based visual emulator for the emulating simple ARM assembly programs. It is designed to be used as a teaching tool for students learning about computer architecture and assembly language programming.

It supports a subset of the ARM Unified Assembler Language (UAL) and provides a visual representation of the registers during program execution. It includes a simple step-through debugger.

This project was developed using the Next.js framework and is written in TypeScript.

## Getting started
chARM is available online at [charm.tomsett.xyz](https://charm.tomsett.xyz/).

### Running locally
To run chARM in a local environment, follow these instructions. You'll need to have Node.js and the Yarn package manager installed.
1. Clone the repository
    ```bash
    git clone https://github.com/BenTomsett/charm
    cd charm
    ```
2. Install dependencies
    ```bash
    yarn install
    ```

3. Run the development server
    ```bash
    yarn start
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.