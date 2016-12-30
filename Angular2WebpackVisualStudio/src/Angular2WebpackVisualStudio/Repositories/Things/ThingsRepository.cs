using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Angular2WebpackVisualStudio.Models;

namespace Angular2WebpackVisualStudio.Repositories.Things
{
    public class ThingsRepository : IThingsRepository
    {
        private readonly ConcurrentDictionary<int, Thing> _storage = new ConcurrentDictionary<int, Thing>();

        public Thing GetSingle(int id)
        {
            Thing thing;
            return _storage.TryGetValue(id, out thing) ? thing : null;
        }

        public Thing Add(Thing item)
        {
            item.Id = !GetAll().Any() ? 1 : GetAll().Max(x => x.Id) + 1;

            if (_storage.TryAdd(item.Id, item))
            {
                return item;
            }

            throw new Exception("Item could not be added");
        }

        public void Delete(int id)
        {
            Thing thing;
            if (!_storage.TryRemove(id, out thing))
            {
                throw new Exception("Item could not be removed");
            }
        }

        public Thing Update(int id, Thing item)
        {
            _storage.TryUpdate(id, item, GetSingle(id));
            return item;
        }

        public ICollection<Thing> GetAll()
        {
            return _storage.Values;
        }

        public int Count()
        {
            return _storage.Count;
        }
    }
}