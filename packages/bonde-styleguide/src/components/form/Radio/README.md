```js
import { Radio } from '../../form';

<div style={{ display: 'flex' }}>
  <Radio name='defaultRadio'>Default</Radio>
  <Radio name='defaultRadio'>Radio</Radio>
</div>
```


### Radio - `defaultChecked`


```js
import { Radio } from '../../form';

<div style={{ display: 'flex' }}>
  <Radio name='checkedRadio' defaultChecked>Checked</Radio>
  <Radio name='checkedRadio'>Radio</Radio>
</div>
```


### Radio - `readOnly`


```js
import { Radio } from '../../form';

<Radio name='readRadio' readOnly>Read only</Radio>
```


### Radio - `disabled`


```js
import { Radio } from '../../form';

<div style={{ display: 'flex' }}>
  <Radio name='disabledRadio' disabled defaultChecked>Disabled and Checked</Radio>
  <Radio name='disabledRadio' disabled>Disabled</Radio>
</div>
```
