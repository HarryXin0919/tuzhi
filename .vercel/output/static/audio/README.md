# Spoken audio

`scripts/{slug}.{zh|en}.txt` is the listen queue. MP3 files live next to this README as `{slug}.{zh|en}.mp3` and `{slug}.how.{zh|en}.mp3`.

Generate with `python3 scripts/tts-generate.py` (edge-tts):

- 中文：`zh-CN-XiaoxiaoNeural`（女声讲解）
- 英文：`en-US-JennyNeural`
- 语速：-5%，句间 400ms 静音

The player (`ReadAloud`) tries the MP3 first, then falls back to `speechSynthesis` (female neural voices preferred; male voices are penalised) and shows 「当前是备用朗读」. Empty MP3s are not committed.

Display text keeps Arabic numerals (`5.5`, `50–150`). Chinese audio converts those for speech only.
