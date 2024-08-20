import React, { useState } from 'react';
import { Todo, Priority, Status } from '../../types/types';

interface TodoFormProps {
    todo?: Todo,
    onSubmit: (todo: Todo) => void;
}

