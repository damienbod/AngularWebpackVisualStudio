using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AngularWebpackVisualStudio;
using AngularWebpackVisualStudio.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Xunit;

namespace AngularWebpackVisualStudio_Tests
{
    public class ThingsController_Tests : IClassFixture<WebApplicationFactory<AngularWebpackVisualStudio.Startup>>
    {
        private readonly WebApplicationFactory<AngularWebpackVisualStudio.Startup> _factory;

        public ThingsController_Tests(WebApplicationFactory<AngularWebpackVisualStudio.Startup> factory)
        {
            _factory = factory;
        }

        //public ThingsController_Tests()
        //{
        //    var hostBuilder = new WebHostBuilder();

        //    // Arrange
        //    var server = new TestServer(hostBuilder.UseStartup<Startup>());
        //    _client = server.CreateClient();
        //}

        [Fact]
        public async Task Should_Add_One_Thing_Then_Return_The_Result()
        {
            // Arrange
            var client = _factory.CreateClient();

            Thing thing = new Thing
            {
                Id = 1,
                Name = "thingname"
            };

            var jsonString = JsonConvert.SerializeObject(thing);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/api/things", content);

            response.EnsureSuccessStatusCode();

            var responseGet = await client.GetAsync("/api/things");
            responseGet.EnsureSuccessStatusCode();
            var resultsInString = await responseGet.Content.ReadAsStringAsync();
            var restulsInThingsArray = JsonConvert.DeserializeObject<Thing[]>(resultsInString);

            Assert.Single(restulsInThingsArray);
        }
    }
}
