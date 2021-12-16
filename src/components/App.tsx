import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import data from '../data/data.json';
import Select from 'react-select';
import Step from '../components/Step';
function App() {
  //data from form instructions
  //languages imported from
  const newData = data['options'].map(val => val);
  const options = newData;
  // Check your console to see the full instructions!
  // const job = formInstructions as Frontier.Job;
  //console.log(job);

  const [formStep, setFormStep] = useState(0);
  const {
    watch,
    register,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  //console.log(errors);
  //Step forward arrangement
  const progressNext = () => {
    setFormStep(value => value + 1);
  };

  const completeFunc = () => {
    console.log(JSON.stringify(watch(), null, 2));
    setFormStep(value => value + 1);
  };
  console.log(formStep);
  //Step before arrangement
  const progressBefore = () => {
    setFormStep(value => value - 1);
  };
  //Submit and Log to console

  //Button arrangement
  const showBtn = () => {
    return formStep > 1 ? undefined : formStep === 1 ? (
      <section className="btn-double">
        <input
          type="button"
          className="btn-pre"
          value="Previous"
          onClick={progressBefore}
        />
        <input
          type="button"
          onClick={completeFunc}
          className="btn-next"
          disabled={!isValid}
          value="Complete"
        />
      </section>
    ) : (
      <input
        type="button"
        value="Next"
        disabled={!isValid}
        onClick={progressNext}
      />
    );
  };

  return (
    <>
      <h1 className="Header">Signup</h1>

      <form>
        <div>
          <Step formStep={formStep} />
        </div>
        <div className="main">
          {formStep === 0 && (
            <section className="s">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                placeholder=""
                {...register('fullName', {
                  required: true,
                })}
              />
              {errors.firstName && <p>First name is required</p>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="email@example.com"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p>Email is required</p>}

              <label htmlFor="yes">Are you 18 years of age or older?</label>
              <select id="age" {...register('age', { required: true })}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.age && <p>First name is required</p>}
            </section>
          )}
          {formStep === 1 && (
            <section>
              <label htmlFor="select">
                Select which languages you're fluent in
              </label>

              <Controller
                control={control}
                defaultValue=""
                name="language"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    {...register('language', {
                      required: true,
                    })}
                    value={options.filter(c => value.includes(c.value))}
                    onChange={val => onChange(val.map(c => c.value))}
                    options={options}
                    isMulti
                  />
                )}
              />
              {errors.language && <p>Language is required</p>}
              <label htmlFor="title">
                Do you have access to a private workspace?
              </label>
              <select
                id="workspace"
                {...register('workspace', { required: true })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.workspace && <p>Workspace is required</p>}
              <label htmlFor="experience">
                What's your experience working in Customer Service?
              </label>
              <textarea
                placeholder="Please elaborate..."
                {...register('experience', { required: true })}
              />

              {errors.experience && <p>Experience is required</p>}
              <label htmlFor="experience">
                How many hours per week could you dedicate to the project,
                including training?
              </label>
              <input
                type="text"
                id="hours_on_project"
                placeholder="Hours..."
                {...register('hours_on_project', { required: true })}
              />
              {errors.hours_on_project && <p>Hours required</p>}
            </section>
          )}

          {formStep === 2 && (
            <section>
              <h4>Congratulations! You applied successfully.</h4>
            </section>
          )}
          {showBtn()}
        </div>
      </form>
    </>
  );
}

export default App;
