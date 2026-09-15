# Spoken audio

`scripts/{slug}.{zh|en}.txt` is the listen queue. Optional MP3 files live next to this README as `{slug}.{zh|en}.mp3`.

The player (`ReadAloud`) tries the MP3 first, then falls back to `speechSynthesis`. Empty MP3s are not committed. Generate them offline from the text scripts when a TTS key is available.

Manifest: `scripts/` contains one text file per article and language. The ten priority guides are also listed in `/sw-tuzhi.js`.
