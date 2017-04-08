using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Angular2WebpackVisualStudio;
using Angular2WebpackVisualStudio.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Xunit;

namespace AngularWebpackVisualStudio_Tests
{
    public class ThingsController_Tests
    {
        private readonly HttpClient _client;
        public ThingsController_Tests()
        {
            var hostBuilder = new WebHostBuilder();

            // Arrange
            var server = new TestServer(hostBuilder.UseStartup<Startup>());
            _client = server.CreateClient();
        }

        [Fact]
        public async Task Should_Add_One_Thing_Then_Return_The_Result()
        {
            var values = new Dictionary<string, string>
            {
                {"Id", "1"},
                { "Name", "NetCore"}
            };

            var jsonString = JsonConvert.SerializeObject(values);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/things", content);

            response.EnsureSuccessStatusCode();

            var responseGet = await _client.GetAsync("/api/things");
            responseGet.EnsureSuccessStatusCode();
            var resultsInString = await responseGet.Content.ReadAsStringAsync();
            var restulsInThingsArray = JsonConvert.DeserializeObject<Thing[]>(resultsInString);

            Assert.Equal(restulsInThingsArray.Length, 1);
        }
    }
}
