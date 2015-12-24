/// <reference path="knockout.d.ts" />
var CPU500x = (function () {
    function CPU500x(registerSize) {
        //internal Pointer to active Register
        this.registerValues = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.activeRegisterIndex = 0;
        this.registerCount = registerSize;
        this.registers = [];
    }
    /// <summary>
    /// Resets the CPU and reinitialze registers and current register index.
    /// </summary>
    CPU500x.prototype.Reset = function () {
        for (var i = 0; i < this.registerCount; i++) {
            this.registers[i] = 0;
        }
        this.activeRegisterIndex = 0;
    };
    //Instruction set
    CPU500x.prototype.charUp = function () {
        this.registers[this.activeRegisterIndex]++;
        if (this.registers[this.activeRegisterIndex] >= this.registerValues.length) {
            this.registers[this.activeRegisterIndex] = 0;
        }
    };
    CPU500x.prototype.charDown = function () {
        this.registers[this.activeRegisterIndex]--;
        if (this.registers[this.activeRegisterIndex] < 0) {
            this.registers[this.activeRegisterIndex] += this.registerValues.length;
        }
    };
    CPU500x.prototype.nextRegister = function () {
        this.activeRegisterIndex++;
        if (this.activeRegisterIndex >= this.registerCount) {
            this.activeRegisterIndex = 0;
        }
    };
    CPU500x.prototype.prevRegister = function () {
        this.activeRegisterIndex--;
        if (this.activeRegisterIndex < 0) {
            this.activeRegisterIndex += this.registerCount;
        }
    };
    CPU500x.prototype.addFirst = function () {
        this.registers[this.activeRegisterIndex] += this.registers[0];
        if (this.registers[this.activeRegisterIndex] >= this.registerValues.length) {
            this.registers[this.activeRegisterIndex] -= this.registerValues.length;
        }
    };
    CPU500x.prototype.getOutput = function () {
        return this.registerValues[this.registers[this.activeRegisterIndex]];
    };
    //DEBUG METHODS
    CPU500x.prototype.d_getRegisterValue = function (index) {
        return this.registers[index];
    };
    CPU500x.prototype.d_getActiveRegister = function () {
        return this.activeRegisterIndex;
    };
    return CPU500x;
})();
var Simulator = (function () {
    function Simulator(registerSize) {
        this.cpu = new CPU500x(registerSize);
        this.cpu.Reset();
    }
    Simulator.prototype.runCode = function (Code) {
        this.cpu.Reset();
        this.hasError = false;
        this.result = "";
        var c;
        for (var pos = 0; pos < Code.length; pos++) {
            c = Code.charAt(pos);
            switch (c) {
                case '>':
                    this.cpu.nextRegister();
                    break;
                case '<':
                    this.cpu.prevRegister();
                    break;
                case '+':
                    this.cpu.charUp();
                    break;
                case '-':
                    this.cpu.charDown();
                    break;
                case 'O':
                    this.result += this.cpu.getOutput();
                    break;
                case 'A':
                    this.cpu.addFirst();
                    break;
                default:
                    this.hasError = true;
                    this.result = "Error at position " + pos + ". Invalid operator :" + c;
                    break;
            }
        }
    };
    return Simulator;
})();
var Register = (function () {
    function Register(i, v) {
        this.index = ko.observable(0);
        this.value = ko.observable(" ");
        this.index(i);
        this.value(v);
    }
    return Register;
})();
//viewmodal of the page
var vmPage = (function () {
    function vmPage() {
        this.displayValues = "-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.registerCount = ko.observable("32");
        this.code = ko.observable("+O>++OO<O");
        this.output = ko.observable("");
        this.debugRegisters = ko.observableArray();
        this.debugActiveReg = ko.observable(0);
        var self = this;
        this.registerCount.subscribe(function (newValue) {
            self.init(parseInt(newValue));
        });
        this.reset = function () {
            self.sim.cpu.Reset();
            self.updateState();
        };
        this.run = function () {
            self.sim.runCode(self.code());
            self.output(self.sim.result);
            self.updateState();
        };
        this.op_nextChar = function () { self.sim.cpu.charUp(); self.updateState(); };
        this.op_prevChar = function () { self.sim.cpu.charDown(); self.updateState(); };
        this.op_nextReg = function () { self.sim.cpu.nextRegister(); self.updateState(); };
        this.op_prevReg = function () { self.sim.cpu.prevRegister(); self.updateState(); };
        this.op_addFirst = function () { self.sim.cpu.addFirst(); self.updateState(); };
        this.op_output = function () {
            self.output(self.output() + self.sim.cpu.getOutput());
            self.updateState();
        };
        this.init = function (regCount) {
            self.sim = new Simulator(regCount);
            self.debugRegisters.removeAll();
            for (var i = 0; i < regCount; i++) {
                self.debugRegisters.push(new Register(i, "-"));
            }
            self.debugActiveReg(0);
            self.output("");
        };
        self.init(32);
    }
    vmPage.prototype.updateState = function () {
        var self = this;
        this.debugRegisters().forEach(function (r, i) {
            var regVal = self.sim.cpu.d_getRegisterValue(i);
            var regStr = self.displayValues.charAt(regVal);
            r.value(regStr);
        });
        self.debugActiveReg(self.sim.cpu.d_getActiveRegister());
    };
    return vmPage;
})();
//# sourceMappingURL=app.js.map