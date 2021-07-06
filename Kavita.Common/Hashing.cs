﻿using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Kavita.Common
{
    public static class Hashing
    {
        public static string SHA256Hash(this string input)
        {
            using (var hash = SHA256Managed.Create())
            {
                var enc = Encoding.UTF8;
                return GetHash(hash.ComputeHash(enc.GetBytes(input)));
            }
        }

        public static string SHA256Hash(this Stream input)
        {
            using (var hash = SHA256Managed.Create())
            {
                return GetHash(hash.ComputeHash(input));
            }
        }

        private static string GetHash(byte[] bytes)
        {
            var stringBuilder = new StringBuilder();

            foreach (var b in bytes)
            {
                stringBuilder.Append(b.ToString("x2"));
            }

            return stringBuilder.ToString();
        }
    }
}