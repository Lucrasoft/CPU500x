using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPU5005
{

    public class CPU500x
    {

        //internal Pointer to active Register
        private const string registerValues = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private int activeRegisterIndex = 0;
        private int registerCount;

        private int[] registers;


        public static CPU500x getCPU500x8reg()
        {
            return new CPU500x(8);
        }

        public static CPU500x getCPU500x32reg()
        {
            return new CPU500x(32);
        }


        private CPU500x(int registerSize)
        {
            this.registerCount = registerSize;
            this.registers = new int[registerCount];
        }

        /// <summary>
        /// Resets the CPU and reinitialze registers and current register index.
        /// </summary>
        public void Reset()
        {
            for (int i = 0; i < registerCount; i++)
            {
                registers[i] = 0;
            }
            activeRegisterIndex = 0;
        }


        public void nextChar()
        {
            this.registers[activeRegisterIndex]++;
            if (this.registers[activeRegisterIndex] >= registerValues.Length)
            {
                this.registers[activeRegisterIndex] = 0;
            }
        }
        public void prevChar()
        {
            this.registers[activeRegisterIndex]--;
            if (this.registers[activeRegisterIndex] <0)
            {
                this.registers[activeRegisterIndex] += registerValues.Length;
            }
        }

        public void nextRegister(){
            activeRegisterIndex++;
            if (activeRegisterIndex>=registerCount)
            {
                activeRegisterIndex = 0;
            }
        }

        public void prevRegister()
        {
            activeRegisterIndex--;
            if (activeRegisterIndex <0 )
            {
                activeRegisterIndex += registerCount;
            }
        }

        public char getOutput()
        {
            return registerValues[this.registers[activeRegisterIndex]];
        }
    
        

    }
}
