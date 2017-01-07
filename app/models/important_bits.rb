class ImportantBits

  def initialize(keywords, offset, limit)
    @keywords = keywords
    @offset = offset
    @limit = limit
    @final_results = ""
  end

  def get_search_results
    argumentations = Argumentation.search_by_title_content(@keywords)
    arguments = Argument.search_by_title_content(@keywords)
    argumentations_of_found_arguments = Argumentation.where(id: arguments.all.pluck(:argumentation_id))

    both = argumentations.union(argumentations_of_found_arguments)
    both = both.offset(@offset).limit(@limit)
    Rails::logger.debug both.inspect
    @final_results = get_modified_array_of_search_results(both)
  end

  private

  def get_modified_array_of_search_results(argumentations)

    final_array = []

    argumentations.each do |argumentation|
      argumentation_hash = {title: argumentation.title, id: argumentation.id, owner: argumentation.user.email, arguments: []}

      argumentation_hash[:bits] = get_important_sentences(nil, argumentation.content)

      argumentation.arguments.each do |argument|
        argumentation_hash[:arguments].push(get_important_sentences(argument.title, argument.content))
      end
      final_array.push(argumentation_hash)
    end
    return final_array
  end

  def get_important_sentences(title, text)
    all_important_sentences = []
    keywords = @keywords.downcase.split

    sentences = text.split(/[\.\!\:\?]/)

    sentences.each do |sentence|
      keywords.each do |keyword|
        if sentence.downcase.include?(keyword)
          all_important_sentences.push(sentence)
          break
        end
      end
    end

    return [] if all_important_sentences.empty?

    return all_important_sentences if title.nil?

    return {title: title, bits: all_important_sentences}

  end

end