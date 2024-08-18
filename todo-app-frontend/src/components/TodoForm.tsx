import React, { useState } from 'react';
import { Todo, Priority, Status } from '../types';

interface TodoFormProps {
    todo?: Todo,
    onSubmit: (todo: Todo) => void;
}

