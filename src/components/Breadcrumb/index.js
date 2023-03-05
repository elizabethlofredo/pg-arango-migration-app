import React from 'react';
import cn from 'classnames';

import { paths } from '../../pages/paths';

export const STEPS = {
  connection: { order: 1, href: paths.connection },
  preview: { order: 2, href: paths.preview },
  migrate: { order: 3, href: paths.migrate },
};

export const Breadcrumb = ({ active = STEPS.connection }) => {
  const StepWrapper = ({ step, children }) => {
    if (step.order <= active.order)
      return (
        <a className='active' href={step.href}>
          {children}
        </a>
      );
    else return <div className='inactive'>{children}</div>;
  };

  return (
    <nav className='breadcrumb-content'>
      <div className='d-flex'>
        <StepWrapper step={STEPS.connection}>
          <div className='d-flex flex-column align-items-center'>
            <div className='breadcrumb-item-number'>
              {STEPS.connection.order}
            </div>
            <span className='breadcrumb-item-text'>Connection</span>
          </div>
        </StepWrapper>

        <div
          className={cn('bar', {
            active: active === STEPS.preview || active === STEPS.migrate,
          })}
        />

        <StepWrapper step={STEPS.preview}>
          <div className='d-flex flex-column align-items-center'>
            <div className='breadcrumb-item-number'>{STEPS.preview.order}</div>
            <span className='breadcrumb-item-text'>Preview</span>
          </div>
        </StepWrapper>

        <div
          className={cn('bar', {
            active: active === STEPS.migrate,
          })}
        />

        <StepWrapper step={STEPS.migrate}>
          <div className='d-flex flex-column align-items-center'>
            <div className='breadcrumb-item-number'>{STEPS.migrate.order}</div>
            <span className='breadcrumb-item-text'>Migration</span>
          </div>
        </StepWrapper>
      </div>
    </nav>
  );
};
