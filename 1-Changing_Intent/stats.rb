class Statistics
  def initialize
    @samples = []
  end

  def add(value)
    @samples << value
  end

  def get_mean
    return nil if @samples.empty?

    sum = @samples.sum
    sum.to_f / @samples.size
  end

  def get_standard_deviation
    mean = get_mean
    return nil if mean.nil?

    sum = @samples.reduce(0) do |acc, sample|
      acc + (sample - mean) ** 2
    end
    Math.sqrt(sum / @samples.size - 1)
  end

  def get_min
    return nil if @samples.empty?

    @samples.min
  end
end
