# ![](favicon.ico) Password Generator

> a simple password generator for myself.

![2x](https://cloud.githubusercontent.com/assets/1147451/16234937/99630060-3805-11e6-90f2-c204d6581df5.png)

## Algorithm

- Information:

```json
{
    "id": "username/email",
    "app": "website/app",
    "key": "Your secret key",
    "length": 12,
    "type": "..."
}
```

- Generate Password:

Information -> JSON Encode -> SHA-512 -> BYTES -> [type[x], ...]
