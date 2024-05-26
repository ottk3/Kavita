using System;
using System.ComponentModel;

namespace API.Entities.Enums;

public enum ReaderMode
{
    [Description("Left and Right")]
    LeftRight = 0,
    [Description("Up and Down")]
    UpDown = 1,
    [Description("Webtoon")]
    [Obsolete("Removed in v0.8.2, use LayoutMode.Webtoon")]
    Webtoon = 2
}
