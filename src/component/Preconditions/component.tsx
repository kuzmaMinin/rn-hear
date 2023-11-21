import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'native-base';

import { setPrecondition } from '../../features/records/recordsSlice';
import { RootState } from '../../store/store';

export default function PreconditionChosen() {
  const precondition = useSelector(
    (state: RootState) => state.records.preconditions,
  );
  const dispatch = useDispatch();
  const preconditions = [
    { title: 'No Noise', value: '0' },
    { title: 'Weak Noise', value: '1' },
    { title: 'Medium Noise', value: '2' },
    { title: 'Heavy Noise', value: '3' },
    { title: 'Very Heavy Noise', value: '4' },
  ];

  return (
    <Radio.Group
      name="preconditions"
      accessibilityLabel="preconditions"
      value={String(precondition)}
      onChange={nextValue => {
        dispatch(setPrecondition(Number(nextValue)));
      }}>
      {preconditions.map(({ title, value }) => (
        <Radio value={value} my={1} key={value} size={'lg'}>
          {title}
        </Radio>
      ))}
    </Radio.Group>
  );
}
