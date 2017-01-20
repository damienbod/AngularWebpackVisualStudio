FROM microsoft/aspnetcore-build:1.1.0-msbuild
ARG source
WORKDIR /app
EXPOSE 80
COPY ${source:-bin/Release/PublishOutput} .
ENTRYPOINT ["dotnet", "Angular2WebpackVisualStudio.dll"]
