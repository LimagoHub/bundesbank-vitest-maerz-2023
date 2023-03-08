using Autofac;
using Autofac.Extras.DynamicProxy;
using Castle.DynamicProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoFacDemo
{
    public class Starter
    {
        private static IContainer Container { get; set; }
        public void run()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<ConsoleOutput>().As<IOutput>();
            builder.RegisterType<TodayWriter>().As<IDateWriter>().EnableInterfaceInterceptors();
            //builder.Register(c => new CallLogger(Console.Out));
            builder.Register(c => new CallLogger(Console.Out)).Named<IInterceptor>("log-calls");

            Container = builder.Build();

            using (var scope = Container.BeginLifetimeScope())
            {
                var writer = scope.Resolve<IDateWriter>();
                writer.WriteDate();
            }

        }
       

    }
}
