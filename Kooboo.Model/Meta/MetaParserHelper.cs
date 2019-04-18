﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;
using Kooboo.Model.Meta.Attributes;
using System.Linq;

namespace Kooboo.Model.Meta
{
    public class MetaParserHelper
    {
        public static List<Dictionary<string,string>> GetMeta(List<PropertyInfo> properties,Type modelType)
        {
            var list = new List<Dictionary<string, string>>();

            var modelProperties = modelType.GetProperties();
            foreach (var prop in properties)
            {
                var dic = new Dictionary<string, string>();
                var attrs = prop.GetCustomAttributes().ToList()
                    .Where(a=>a is IMetaAttribute)
                    .Select(a => a as IMetaAttribute).ToList();
                if(attrs.Count>0)
                {
                    foreach (var itemPropery in modelProperties)
                    {
                        var attr = attrs.Find(a => a.PropertyName.Equals(itemPropery.Name, StringComparison.OrdinalIgnoreCase));
                        if (attr != null)
                        {
                            dic.Add(attr.PropertyName, attr.Value());
                        }

                    }
                    list.Add(dic);
                }
                

            }
            return list;
        }
    }
}