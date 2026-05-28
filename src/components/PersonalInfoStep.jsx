export default function PersonalInfoStep({ register, errors }) {
  return (
    <div className="form-section">
      <div className="two-column">
        <div className="input-group">
          <label>First Name</label>

          <input type="text" {...register("firstName")} />

          <p className="error-text">{errors.firstName?.message}</p>
        </div>

        <div className="input-group">
          <label>Last Name</label>

          <input type="text" {...register("lastName")} />

          <p className="error-text">{errors.lastName?.message}</p>
        </div>
      </div>

      <div className="input-group">
        <label>Date of Birth</label>

        <input type="date" {...register("dob")} />

        <p className="error-text">{errors.dob?.message}</p>
      </div>
    </div>
  );
}