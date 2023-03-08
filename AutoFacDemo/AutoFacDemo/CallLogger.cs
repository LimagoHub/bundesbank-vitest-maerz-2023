using Castle.DynamicProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoFacDemo
{
    public class CallLogger : IInterceptor
    {
        TextWriter _output;

        public CallLogger(TextWriter output)
        {
            _output = output;
        }

        public void Intercept(IInvocation invocation)
        {
            _output.Write("Calling method {0} with parameters {1}... ",
              invocation.Method.Name,
              string.Join(", ", invocation.Arguments.Select(a => (a ?? "").ToString()).ToArray()));
            OnEntry();
           try
            {
                invocation.Proceed(); // eigentlicher Methodenaufruf
            } catch(Exception)
            {
                OnTrow();
            }

            OnExit();
            _output.WriteLine("Done: result was {0}.", invocation.ReturnValue);
        }

        private void OnEntry()
        {

        }

        private void OnExit()
        {

        }
        private void OnTrow()
        {

        }
    }
}
