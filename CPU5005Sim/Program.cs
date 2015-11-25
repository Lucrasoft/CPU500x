using CPU5005;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPU5005Sim
{
    class Program
    {
        static void Main(string[] args)
        {

            string code;

            if (args.Length > 0)
            {
                code = args[0];
            } else
            {
                //code = "+O>++OO<O";
                code = "+O+O+O+O+O+O+O+O+O+O+O+O+O+O+O+O";
                    }
       
           
            var sim = new Simulator();
            sim.runCode(code);

            if (!sim.hasError)
            {
                Console.WriteLine(sim.result);
            }
            Console.ReadKey();
            

        }
    }
}
