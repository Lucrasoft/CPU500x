/// <reference path="knockout.d.ts" />

class CPU500x {

    //internal Pointer to active Register
    private registerValues: string = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private activeRegisterIndex: number = 0;
    private registerCount: number;

    private registers: number[];


    constructor(registerSize: number) {
        this.registerCount = registerSize;
        this.registers = [];
    }

    /// <summary>
    /// Resets the CPU and reinitialze registers and current register index.
    /// </summary>
    public Reset(): void {
        for (var i: number = 0; i < this.registerCount; i++) {
            this.registers[i] = 0;
        }
        this.activeRegisterIndex = 0;
    }


    //Instruction set
    public charUp(): void {
        this.registers[this.activeRegisterIndex]++;
        if (this.registers[this.activeRegisterIndex] >= this.registerValues.length) {
            this.registers[this.activeRegisterIndex] = 0;
        }
    }
    public charDown(): void {
        this.registers[this.activeRegisterIndex]--;
        if (this.registers[this.activeRegisterIndex] < 0) {
            this.registers[this.activeRegisterIndex] += this.registerValues.length;
        }
    }

    public nextRegister(): void {
        this.activeRegisterIndex++;
        if (this.activeRegisterIndex >= this.registerCount) {
            this.activeRegisterIndex = 0;
        }
    }

    public prevRegister(): void {
        this.activeRegisterIndex--;
        if (this.activeRegisterIndex < 0) {
            this.activeRegisterIndex += this.registerCount;
        }
    }

    public getOutput(): string {
        return this.registerValues[this.registers[this.activeRegisterIndex]];
    }

    //DEBUG METHODS
    public d_getRegisterValue(index: number): number {
        return this.registers[index];
    }

    public d_getActiveRegister(): number {
        return this.activeRegisterIndex;
    }

}


class Simulator {


    public cpu: CPU500x;

    public hasError: boolean;
    public result: string;

    constructor(registerSize: number) {
        this.cpu = new CPU500x(registerSize);
        this.cpu.Reset();
    }


    public runCode(Code: string): void {
        this.cpu.Reset();
        this.hasError = false;
        this.result = "";

        var c;

        for (var pos: number = 0; pos < Code.length; pos++) {

            c = Code.charAt(pos);
            switch (c) {
                case '>': this.cpu.nextRegister();
                    break;
                case '<': this.cpu.prevRegister();
                    break;
                case '+': this.cpu.charUp();
                    break;
                case '-': this.cpu.charDown();
                    break;
                case 'O': this.result += this.cpu.getOutput();
                    break;
                default:
                    this.hasError = true;
                    this.result = "Error at position " + pos + ". Invalid operator :" + c;
                    break;
            }

        }
    }



}


class Register {

    index = ko.observable(0);
    value = ko.observable(" ");

    constructor(i: number, v: string) {
        this.index(i);
        this.value(v);
    }
}

//viewmodal of the page
class vmPage {


    private displayValues: string = "-ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public sim: Simulator;

    registerCount: KnockoutObservable<string> = ko.observable("32");
    code: KnockoutObservable<string> = ko.observable("+O>++OO<O");
    output: KnockoutObservable<string> = ko.observable("");

    debugRegisters: KnockoutObservableArray<Register> = ko.observableArray<Register>();
    debugActiveReg = ko.observable<number>(0);

    //methods
    run: () => void;
    reset: () => void;
    init: (regCount: number) => void;

    op_nextReg: () => void; 
    op_prevReg : () => void;
    op_nextChar: () => void;
    op_prevChar: () => void;
    op_output: () => void;

    constructor() {
        var self = this;

        this.registerCount.subscribe((newValue: string) => {
            self.init(parseInt(newValue));
        });

    
        this.reset = () => {
            self.sim.cpu.Reset();
            self.updateState();
        };

        this.run = () => {
            self.sim.runCode(self.code());
            self.output(self.sim.result);
            self.updateState();
        };

        this.op_nextChar = () => { self.sim.cpu.charUp(); self.updateState(); }
        this.op_prevChar = () => { self.sim.cpu.charDown(); self.updateState();  }
        this.op_nextReg = () => { self.sim.cpu.nextRegister(); self.updateState();  }
        this.op_prevReg = () => { self.sim.cpu.prevRegister(); self.updateState(); }
        this.op_output = () => {
            self.output(self.output() + self.sim.cpu.getOutput());
            self.updateState(); 
        }

        this.init = (regCount: number) => {

            self.sim = new Simulator(regCount);

            self.debugRegisters.removeAll();
            for (var i: number = 0; i < regCount; i++) {
                self.debugRegisters.push(new Register(i, "-"));
            }
            self.debugActiveReg(0);

            self.output("");
        }

        self.init(32);
    }

 

    private updateState() {
        var self = this;
        this.debugRegisters().forEach((r, i) => {
            var regVal = self.sim.cpu.d_getRegisterValue(i);
            var regStr = self.displayValues.charAt(regVal);
            r.value(regStr);
        });
        self.debugActiveReg(self.sim.cpu.d_getActiveRegister());
    }
  

}

