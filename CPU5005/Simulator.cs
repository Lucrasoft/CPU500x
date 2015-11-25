using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPU5005
{
    public class Simulator
    {
        private CPU500x cpu;


        public bool hasError { get; private set;  }

        public string result { get; private set; }

        public Simulator()
        {
            cpu = CPU500x.getCPU500x8reg();
        }


        public void runCode(string Code)
        {
            cpu.Reset();
            hasError = false;
            result = "";
            int position = 0;

            foreach (var c in Code)
            {
                switch (c)
                {
                   case '>': cpu.nextRegister();
                        break;
                    case '<': cpu.prevRegister();
                     break;
                    case '+':cpu.nextChar();
                        break;
                    case '-': cpu.prevChar();
                        break;
                    case 'O': result += cpu.getOutput();
                        break;
                    default:
                        hasError = true;
                        result ="Error at position " + position + ". Invalid operator: " + c;
                        break;
                }

                position++;
              
            }

         

        }
        
            
    }
}
