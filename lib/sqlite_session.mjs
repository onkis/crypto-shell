/*!
 * Sqlite Session store
 * //TODO: Unit Test this?
 * MIT Licensed
 */

export  function sqliteSession(session) {
  const Store = session.Store

  // All callbacks should have a noop if none provided for compatibility
  const noop = () => {}

  class SqliteStore extends Store {
    constructor(options = {}) {
      super(options)
      if (!options.client) {
        throw new Error("KVStore must be directly provided to the Sqlite Store as 'client'")
      }

      this.prefix = options.prefix == null ? "sess:" : options.prefix
      this.scanCount = Number(options.scanCount) || 100
      this.serializer = options.serializer || JSON
      this.client = options.client
      this.ttl = options.ttl || 86400 // One day in seconds.
      this.disableTTL = options.disableTTL || false
      this.disableTouch = options.disableTouch || false
    }

    get(sid, cb = noop) {
      let key = this.prefix + sid

      this.client.getCB(key, (err, data) => {
        if (err) return cb(err)
        if (!data) return cb()

        let result
        try {
          result = this.serializer.parse(data)
        } catch (err) {
          return cb(err)
        }
        return cb(null, result)
      })
    }

    set(sid, sess, cb = noop) {
      console.log("calling sessions set", sid, sess);
      let key = this.prefix + sid;

      let value;
      try {
        value = this.serializer.stringify(sess)
      } catch (er) {
        return cb(er)
      }

      let ttl = 1
      if (!this.disableTTL) {
        ttl = this._getTTL(sess)
      }

      if (ttl > 0) {
        this.client.setCB(key, value, {EX: ttl}, cb)
      } else {
        // If the resulting TTL is negative we can delete / destroy the key
        this.destroy(sid, cb)
      }
    }

    touch(sid, sess, cb = noop) {
      if (this.disableTouch || this.disableTTL) return cb()
      let key = this.prefix + sid
      this.client.expireCB(key, this._getTTL(sess), (err, ret) => {
        if (err) return cb(err)
        if (ret !== 1) {
          return cb(null, "EXPIRED")
        }
        else {
          cb(null, "OK")
        }
      });
    }

    destroy(sid, cb = noop) {
      let key = this.prefix + sid;
      this.client.delCB(key, cb)
    }

//TODO: implement these later....
//     clear(cb = noop) {
//       this._getAllKeys((err, keys) => {
//         if (err) return cb(err)
//         this.client.del(keys, cb)
//       })
//     }
// 
//     length(cb = noop) {
//       this._getAllKeys((err, keys) => {
//         if (err) return cb(err)
//         return cb(null, keys.length)
//       })
//     }
// 
//     ids(cb = noop) {
//       let prefixLen = this.prefix.length
// 
//       this._getAllKeys((err, keys) => {
//         if (err) return cb(err)
//         keys = keys.map((key) => key.substr(prefixLen))
//         return cb(null, keys)
//       })
//     }
// 
//     all(cb = noop) {
//       let prefixLen = this.prefix.length
// 
//       this._getAllKeys((err, keys) => {
//         if (err) return cb(err)
//         if (keys.length === 0) return cb(null, [])
// 
//         this.client.mget(keys, (err, sessions) => {
//           if (err) return cb(err)
// 
//           let result
//           try {
//             result = sessions.reduce((accum, data, index) => {
//               if (!data) return accum
//               data = this.serializer.parse(data)
//               data.id = keys[index].substr(prefixLen)
//               accum.push(data)
//               return accum
//             }, [])
//           } catch (e) {
//             err = e
//           }
//           return cb(err, result)
//         })
//       })
//     }
// 
    _getTTL(sess) {
      let ttl
      if (sess && sess.cookie && sess.cookie.expires) {
        let ms = Number(new Date(sess.cookie.expires)) - Date.now()
        ttl = Math.ceil(ms / 1000)
      } else {
        ttl = this.ttl
      }
      return ttl
    }
// 
//     _getAllKeys(cb = noop) {
//       let pattern = this.prefix + "*"
//       this._scanKeys({}, 0, pattern, this.scanCount, cb)
//     }
// 
//     _scanKeys(keys = {}, cursor, pattern, count, cb = noop) {
//       let args = [cursor, "match", pattern, "count", count]
//       this.client.scan(args, (err, data) => {
//         if (err) return cb(err)
// 
//         let [nextCursorId, scanKeys] = data
//         for (let key of scanKeys) {
//           keys[key] = true
//         }
// 
//         // This can be a string or a number. We check both.
//         if (Number(nextCursorId) !== 0) {
//           return this._scanKeys(keys, nextCursorId, pattern, count, cb)
//         }
// 
//         cb(null, Object.keys(keys))
//       })
//     }
   }//end of class

  return SqliteStore;
}
