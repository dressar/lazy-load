package com.techandsolve.lazyload.business.collectors;

import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

public class LazyLoadCollector implements Collector<Integer,LazyLoadCreator,List<String>>{
    @Override
    public Supplier<LazyLoadCreator> supplier() {
        return ()->new LazyLoadCreator();
    }

    @Override
    public BiConsumer<LazyLoadCreator, Integer> accumulator() {
        return (creator, caso) -> creator.addCaso(caso);
    }

    @Override
    public BinaryOperator<LazyLoadCreator> combiner() {
        return null;
    }

    @Override
    public Function<LazyLoadCreator, List<String>> finisher() {
        return (creator) -> creator.getListaCasos();
    }

    @Override
    public Set<Characteristics> characteristics() {
        return EnumSet.of(Characteristics.UNORDERED);
    }
}
